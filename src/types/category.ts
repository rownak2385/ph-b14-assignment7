export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

export type CategoryResult = {
  categories: Category[];
  status: "success" | "error";
};

