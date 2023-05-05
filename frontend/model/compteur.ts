export class Compteur {
  static aggregate(arg0: ({ $match: { date: { $gte: Date; $lt: Date; }; }; } | { $group: { _id: null; total1: { $sum: string; }; total2: { $sum: string; }; }; })[]) {
    throw new Error('Method not implemented.');
  }

  nbr_rempli!: string;
  total1!: string;
  total2!: string;

  date!: string;

  heure!: string;

}
