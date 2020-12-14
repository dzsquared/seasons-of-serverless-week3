CREATE PROCEDURE [dbo].[saveRecipe]
  @LambKilos DECIMAL(14,2),
  @Onions DECIMAL(14,2),
  @GarlicCloves DECIMAL(14,2),
  @CuminTeaspoons DECIMAL(14,2),
  @SumacTeaspoons DECIMAL(14,2),
  @SaltTeaspoons DECIMAL(14,2),
  @BlackPepperTeaspoons DECIMAL(14,2),
  @RedPepperTeaspoons DECIMAL(14,2),
  @LengthCm INT,
  @FeedsPeople INT
AS
BEGIN
  INSERT INTO dbo.Recipes (LambKilos, Onions, GarlicCloves, CuminTeaspoons,
    SumacTeaspoons, SaltTeaspoons, BlackPepperTeaspoons, RedPepperTeaspoons,
    LengthCm, FeedsPeople)
  SELECT @LambKilos, @Onions, @GarlicCloves, @CuminTeaspoons,
  @SumacTeaspoons, @SaltTeaspoons, @BlackPepperTeaspoons, 
  @RedPepperTeaspoons, @LengthCm, @FeedsPeople
END
