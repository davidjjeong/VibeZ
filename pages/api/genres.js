import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  if(req.method === 'POST'){
    const { body } = req;
    const {
      id,
      lid,
      userId_G,
      genre,
    } = JSON.parse(body);
    const userGenre = {
        id: id,
        lid: lid,
        userId_G: userId_G,
        genre: genre,
    };
    const createGenre = await prisma.genre.create({
      data: userGenre,
    });
    return res.status(200).json(createGenre);
  } else if(req.method === 'GET'){
    const getUserGenre = await prisma.genre.findMany({
      orderBy: {
        id: 'desc',
      },
      distinct: ['genre'],
      take: 10,
    });
    return res.status(200).json(getUserGenre);
  }
  res.end();
};

export default handler;