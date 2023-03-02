import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  if(req.method === 'POST'){
    const { body } = req;
    const {
      lid,
      userId_T,
      trackID,
      trackName,
      singer,
    } = JSON.parse(body);
    const trackInfo = {
      lid: lid,
      userId_T: userId_T,
      trackID: trackID,
      trackName: trackName,
      singer: singer,
    };
    const createTrack = await prisma.track.create({
      data: trackInfo,
    });
    return res.status(200).json(createTrack);
  } else if(req.method === 'GET'){
    const getTracks = await prisma.track.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 10,
    });
    return res.status(200).json(getTracks);
  }
  res.end();
};

export default handler;