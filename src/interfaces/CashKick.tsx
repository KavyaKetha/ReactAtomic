export interface RowData {
  id: number;
  name: string;
  type: string;
  expectedAmount: string;
  termLength: string;
  paymentAmount: string;
}

export interface SummaryProps {
  // term: string;
  selectedContracts: RowData[];
  // onReset: () => void;
  handleReview: () => void;
  // minAmount: number;
  // maxAmount: number;
  // paybackAmount: number;
  // rate: number;
  isReviewed: boolean;
  // onSliderChange: (amount: number) => void;
}

export interface CashKickAlertProps {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
  // isModalOpen?: boolean;
  // handleCloseModal?: () => void;
  // handleModalSubmit?: (e: React.FormEvent) => void;
}
