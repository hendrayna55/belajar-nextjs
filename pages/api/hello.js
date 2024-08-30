// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  // res.status(200).json({ name: "John Doe" });
  try {
    const response = await (await fetch('https://lms.jukugakuincentre.id/api/get-angkatan')).json();
    res.status(200).json({ ... response });
  } catch (error) {
    
  }
}
