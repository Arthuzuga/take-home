export type SavingsItem = {
  id: string;
  icon: string;
  label: string;
  amount: string;
  period: string;
  status: 'setup' | 'ready';
};
export type SavingsArray = Array<SavingsItem>;
