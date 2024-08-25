export class ArticleType {
  constructor(
    public id: string,
    public title: string,
    public tag: string,
    public main_text: string,
    public posted: boolean,
    public ai_answer: string,
    public updated_at: string,
    public created_at: string
  ) {}
}
