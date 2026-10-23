CREATE TABLE IF NOT EXISTS practice_letters (
  letter CHAR(1) PRIMARY KEY,
  instruction VARCHAR(500) NOT NULL
) CHARACTER SET utf8mb4;

INSERT INTO practice_letters (letter, instruction) VALUES
('A', 'Mão fechada, polegar ao lado dos dedos e voltado para cima.'),
('B', 'Quatro dedos unidos e estendidos, polegar dobrado sobre a palma.'),
('C', 'Dedos e polegar curvados no formato de C.'),
('D', 'Indicador estendido e demais dedos unidos ao polegar.')
ON DUPLICATE KEY UPDATE instruction = VALUES(instruction);

CREATE TABLE IF NOT EXISTS practice_sessions (
  id CHAR(36) PRIMARY KEY,
  letter CHAR(1) NOT NULL,
  attempts SMALLINT UNSIGNED NOT NULL,
  evaluation VARCHAR(10) NOT NULL DEFAULT 'manual',
  created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  CONSTRAINT fk_session_letter FOREIGN KEY (letter) REFERENCES practice_letters(letter),
  CONSTRAINT chk_attempts CHECK (attempts BETWEEN 1 AND 100),
  CONSTRAINT chk_evaluation CHECK (evaluation = 'manual')
);
