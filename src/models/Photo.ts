export type Photo = {
  id: string;
  creationDate: Date;
  description: string;
  creatorName: string;
  thumbURL: string;
  regularURL: string;
  dimensions: {
    width: number;
    height: number;
  };
};

export const getPhoto = (obj: any, dimensions: { width: number; height: number }) => {
  const { id, created_at, description, user, urls } = obj;

  const photo: Photo = {
    id,
    creationDate: new Date(created_at),
    description,
    creatorName: user.name,
    regularURL: urls.regular,
    thumbURL: urls.thumb,
    dimensions, // Inclua as dimensões fornecidas aqui
  };

  return photo;
};
