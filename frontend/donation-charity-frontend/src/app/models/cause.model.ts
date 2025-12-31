export interface Cause {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  image: string;
  category: string;
  impactStats: {
    beneficiaries: number;
    fundsRaised: number;
    goal: number;
    volunteers: number;
  };
}
