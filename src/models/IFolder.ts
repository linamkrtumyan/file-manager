export interface IFolder {
  id: number;
  title: string;
  body: string;
  isActive: boolean;
  parentFolderId: number | null | undefined
}
