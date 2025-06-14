export type UserInput = { name: string; email: string };

export type UserFilters = Partial<UserInput> & {
  useOrOperator?: boolean;
};
