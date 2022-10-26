export interface IFile {
  id: number ;
  folderId: number | null | string | undefined;
  title: string;
  body: string | undefined;
  isActive: boolean;
}
