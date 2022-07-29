INSERT INTO products(uuid, title, description, price)
VALUES
(gen_random_uuid(), 'The Witcher 3', 'The Witcher 3', 10),
(gen_random_uuid(), 'Red Dead Redemption 2', 'Red Dead Redemption 2', 20),
(gen_random_uuid(), 'Marvel Spider Man', 'Marvel Spider Man', 18),
(gen_random_uuid(), 'Until Dawn', 'Until Dawn', 8),
(gen_random_uuid(), 'Dying Light', 'Dying Light', 7),
(gen_random_uuid(), 'Watch Dogs', 'Watch Dogs', 5),
(gen_random_uuid(), 'FIFA 22', 'FIFA 22', 10),
(gen_random_uuid(), 'Snow Runner', 'Snow Runner', 20);

INSERT INTO stocks(product_id, count)
VALUES
('51bbc4e9-cb46-40ac-99c7-c93fab4a40e9', 10),
('a4443458-740d-42d6-ba2b-21a0f5f20340', 15),
('abffb980-2c65-40ec-a912-90c44937dad1', 7),
('ed1fd9db-e1c7-40bd-9d2f-4ccaf9352579', 3),
('c003d221-0675-45d3-a498-4961353a475d', 11),
('967fd68c-4bec-4ba4-8e79-aac9e309a5de', 20),
('eabb597d-8977-458a-8434-68bf53a4eea4', 4),
('24f95a1d-42c2-4259-86b0-4c017d4d148b', 3);
