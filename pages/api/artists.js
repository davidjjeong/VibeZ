import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  if(req.method === 'POST'){
    const { body } = req;
    const {
      id,
      lid,
      userId_A,
      artist,
    } = JSON.parse(body);
    const userArtist = {
        id: id,
        lid: lid,
        userId_A: userId_A,
        artist: artist,
    };
    const createArtist = await prisma.artist.create({
      data: userArtist,
    });
    return res.status(200).json(createArtist);
  } else if(req.method === 'GET'){
    const getUserArtist = await prisma.artist.findMany({
      orderBy: {
        id: 'desc',
      },
      distinct: ['artist'],
      take: 10,
    });
    return res.status(200).json(getUserArtist);
  }
  res.end();
};

export default handler;