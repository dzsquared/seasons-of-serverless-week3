CREATE PROCEDURE [dbo].[getRecord]
AS
BEGIN
  SELECT TOP 1 LambKilos, Onions, GarlicCloves, CuminTeaspoons, SumacTeaspoons, SaltTeaspoons,
      BlackPepperTeaspoons, RedPepperTeaspoons, LengthCm, FeedsPeople
  FROM Recipes
  ORDER BY LengthCm DESC, Id ASC
END
