import { v4 as uuidv4 } from "uuid";

export const data = {
  id: uuidv4(),
  name: "Main category",
  product: 130,
  childs: ["Main category"],
  children: [
    {
      id: uuidv4(),
      name: "Sub category",
      product: 30,
      childs: ["Main category", "Sub category"],
      children: [
        {
          id: uuidv4(),
          name: "Sub category level",
          product: 54,
          childs: ["Main category", "Sub category", "Sub category level"],
          children: [
            {
              id: uuidv4(),
              name: "Category item 1",
              childs: [
                "Main category",
                "Sub category",
                "Sub category level",
                "Category item 1",
              ],
              product: 30,
            },
            {
              id: uuidv4(),
              name: "Category item 2",
              childs: [
                "Main category",
                "Sub category",
                "Sub category level",
                "Category item 2",
              ],
              product: 24,
            },
          ],
        },
        {
          id: uuidv4(),
          name: "Sub category level 2",
          product: 60,
          childs: ["Main category", "Sub category", "Sub category level 2"],
          children: [
            {
              id: uuidv4(),
              name: "Category item 3",
              childs: [
                "Main category",
                "Sub category",
                "Sub category level 2",
                "Category item 3",
              ],
              product: 32,
            },
            {
              id: uuidv4(),
              name: "Category item 4",
              childs: [
                "Main category",
                "Sub category",
                "Sub category level 2",
                "Category item 4",
              ],
              product: 28,
            },
            {
              id: uuidv4(),
              name: "Category item 5",
              childs: [
                "Main category",
                "Sub category",
                "Sub category level 2",
                "Category item 5",
              ],
              product: 123,
            },
            {
              id: uuidv4(),
              name: "Category item 6",
              childs: [
                "Main category",
                "Sub category",
                "Sub category level 2",
                "Category item 6",
              ],
              product: 73,
            },
          ],
        },
      ],
    },
  ],
};
