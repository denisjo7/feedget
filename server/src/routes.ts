import { Router } from 'express';
import nodemailer from 'nodemailer';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = Router();

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '15eab1d5e18c06',
    pass: 'e0632bcd39e5ad',
  },
});

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbacksRepository();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository
  );

  await submitFeedbackUseCase.execute({ type, comment, screenshot });

  await transport.sendMail({
    from: 'Equipe Feedget <freezing@feedget.com>',
    to: 'Denis Jonathan <denisjonathan7@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Conteúdo do feedback: ${comment}</p>`,
      `</div>`,
    ].join('\n'),
  });

  return res.status(201).end();
});
