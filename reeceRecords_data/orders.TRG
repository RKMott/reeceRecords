TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER trg_set_receipt_num\nBEFORE INSERT ON orders\nFOR EACH ROW\nBEGIN\n    DECLARE max_receipt INT;\n\n    SELECT IFNULL(MAX(receipt_num), 20250000) INTO max_receipt FROM orders;\n\n    SET NEW.receipt_num = max_receipt + 1;\nEND'
sql_modes=1098907648
definers='root@localhost'
client_cs_names='utf8mb4'
connection_cl_names='utf8mb4_unicode_ci'
db_cl_names='utf8mb4_general_ci'
created=1747131315971612
