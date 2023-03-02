import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  if(req.method === 'POST'){
    const { body } = req;
    const {
      lid,
      username,
      m_i,
      m_d,
      m_s,
    } = JSON.parse(body);
    const manipulation = {
      lid: lid,
      username: username,
      m_i: m_i,
      m_d: m_d,
      m_s: m_s,
    };
    const createManipulation = await prisma.listen.create({
      data: manipulation,
    });
    return res.status(200).json(createManipulation);
  } else if(req.method === 'GET'){
    const getManipulation = await prisma.listen.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 10,
    });
    return res.status(200).json(getManipulation);
  }
  res.end();
};

export default handler;