import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

describe('Submit feedback', () => {
  const submitFeedback = new SubmitFeedbackUseCase(
    { create: async () => {} },
    { sendMail: async () => {} }
  );

  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'Example comment',
        screenshot: 'data:image/png;base64,12h7856d1239hasd2',
      })
    ).resolves.not.toThrow();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'Example comment',
        screenshot: 'data:image/png;base64,12h7856d1239hasd2',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,12h7856d1239hasd2',
      })
    ).rejects.toThrow();
  });
});
