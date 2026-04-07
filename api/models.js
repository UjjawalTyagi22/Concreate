module.exports = function(req, res) {
  res.status(200).json({
    models: [
      { name: 'llama-3.1-8b-instant' },
      { name: 'llama-3.3-70b-versatile' },
      { name: 'mixtral-8x7b-32768' },
      { name: 'gemma2-9b-it' },
      { name: 'deepseek-r1-distill-llama-70b' }
    ]
  });
};
