CREATE TABLE [dbo].[Recipes]
(
  [Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  LambKilos DECIMAL(14,2) NOT NULL,
  Onions DECIMAL(14,2) NOT NULL,
  GarlicCloves DECIMAL(14,2) NOT NULL,
  CuminTeaspoons DECIMAL(14,2) NOT NULL,
  SumacTeaspoons DECIMAL(14,2) NOT NULL,
  SaltTeaspoons DECIMAL(14,2) NOT NULL,
  BlackPepperTeaspoons DECIMAL(14,2) NOT NULL,
  RedPepperTeaspoons DECIMAL(14,2) NOT NULL,
  LengthCm INT NOT NULL,
  FeedsPeople INT NOT NULL,
  INDEX IX_Length (LengthCm DESC)
)