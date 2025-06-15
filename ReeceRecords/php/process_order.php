<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $full_name = $_POST['full_name'] ?? '';
    $email = $_POST['email'] ?? '';
    $cardholder_name = $_POST['cardholder_name'] ?? '';
    $card_number = $_POST['card_number'] ?? '';
    $expiry_date = $_POST['expiry_date'] ?? '';
    $cvv = $_POST['cvv'] ?? '';
    $cart_data = json_decode($_POST['cart_data'], true);

    if (!$cart_data || count($cart_data) === 0) {
        echo "<script>alert('Your cart is empty.'); window.location.href = '../cart.html';</script>";
        exit;
    }

    // Check if customer exists
    $stmt = $conn->prepare("SELECT id FROM customers WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($customer_id);
        $stmt->fetch();
        $message = "Account already exists. This transaction has been added to your account.";
    } else {
        $stmt = $conn->prepare("INSERT INTO customers (full_name, email) VALUES (?, ?)");
        $stmt->bind_param("ss", $full_name, $email);
        $stmt->execute();
        $customer_id = $stmt->insert_id;
        $message = "New account created. Proceeding with transaction.";
    }

    // Calculate total
    $total = 0;
    foreach ($cart_data as $item) {
        $total += $item['price'] * $item['quantity'];
    }

    // Insert into orders
    $stmt = $conn->prepare("INSERT INTO orders (customer_id, total) VALUES (?, ?)");
    $stmt->bind_param("id", $customer_id, $total);
    $stmt->execute();
    $order_id = $stmt->insert_id;

    // Insert each item
    foreach ($cart_data as $item) {
        $stmt = $conn->prepare("INSERT INTO order_items (order_id, service_id, quantity) VALUES (?, ?, ?)");
        $stmt->bind_param("iii", $order_id, $item['id'], $item['quantity']);
        $stmt->execute();
    }

    // Insert payment
    $stmt = $conn->prepare("INSERT INTO payments (order_id, cardholder_name, card_number, expiry_date, cvv) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("issss", $order_id, $cardholder_name, $card_number, $expiry_date, $cvv);
    $stmt->execute();

    // Fetch receipt_num for this order
    $result = $conn->query("SELECT receipt_num FROM orders WHERE id = $order_id");
    $receipt_num = "N/A";

    if ($result && $row = $result->fetch_assoc()) {
        $receipt_num = $row['receipt_num'];
    }

    // Popups using JS alert
    $cart_items = "";
    foreach ($cart_data as $item) {
        $cart_items .= "{$item['quantity']} x {$item['name']} (£{$item['price']})\\n";
    }

    $alert_message = "RECEIPT\\n";
    $alert_message .= "=== Name ===\\n$full_name\\n\\n";
    $alert_message .= "=== Items ===\\n$cart_items\\n";
    $alert_message .= "=== Total Paid ===\\n£" . number_format($total, 2) . "\\n";
    $alert_message .= "=== Receipt Number ===\\n$receipt_num";

    echo "<script>
    alert('$message');
    alert(`$alert_message`);
    localStorage.setItem('clearCart', 'true');
    window.location.href = '../cart.html';
    </script>";
}
?>