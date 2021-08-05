import { generateArrayOfYears } from ".";

describe("generate year range function", () => {
  test("works as expected", () => {
    const expected = [
      2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009,
      2008, 2007,
    ];
    const result = generateArrayOfYears();
    expect(result).toEqual(expected);
  });
  test("does not have current year", () => {
    const unExpected = [2021];
    const result = generateArrayOfYears();
    expect(result).not.toEqual(expect.arrayContaining(unExpected));
  });
});
