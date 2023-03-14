// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { knex } from '@/config/knex'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const body = req.body
  if (!body.name || !body.score) {
    return res.status(400).json({ data: 'Name or score not found' })
  }

  await knex('runs').insert({ name: body.name, score: body.score, submitted_at: Date.now() });

  res.status(200).json({ data: `${body.name} ${body.score}` })
}