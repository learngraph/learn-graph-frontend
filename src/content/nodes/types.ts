export interface NodeArticleAction {
  label: string;
  href: string;
  external?: boolean;
}

export interface NodeArticle {
  eyebrow: string;
  title: string;
  lead: string;
  body: string[];
  action?: NodeArticleAction;
}
