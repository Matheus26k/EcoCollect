import nodemailer from 'nodemailer';

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || 'ecocollect@gmail.com',
        pass: process.env.EMAIL_PASS || 'senha_app'
      }
    });
  }

  async sendAgendamentoConfirmation(agendamento: any) {
    if (!agendamento.email) {
      return; // Não envia se não tem email
    }

    const materiaisNomes = agendamento.materiais.map((m: any) => m.material.name).join(', ');
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'ecocollect@gmail.com',
      to: agendamento.email,
      subject: `EcoCollect - Agendamento Confirmado - Protocolo ${agendamento.protocolo}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Agendamento Confirmado!</h2>
          
          <p>Olá <strong>${agendamento.nomeCompleto}</strong>,</p>
          
          <p>Seu agendamento de coleta foi confirmado com sucesso!</p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">Detalhes do Agendamento</h3>
            <p><strong>Protocolo:</strong> ${agendamento.protocolo}</p>
            <p><strong>Data Sugerida:</strong> ${new Date(agendamento.dataSugerida).toLocaleDateString('pt-BR')}</p>
            <p><strong>Endereço:</strong> ${agendamento.endereco}, ${agendamento.numero} - ${agendamento.bairro}</p>
            <p><strong>Cidade:</strong> ${agendamento.cidade}</p>
            <p><strong>Telefone:</strong> ${agendamento.telefone}</p>
            <p><strong>Materiais:</strong> ${materiaisNomes}</p>
          </div>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>⚠️ Importante:</strong> Guarde o número do protocolo para acompanhar seu agendamento.</p>
          </div>
          
          <p>Entraremos em contato em breve para confirmar a data e horário da coleta.</p>
          
          <p>Obrigado por contribuir com o meio ambiente!</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px;">
            EcoCollect - Sistema de Coletas Recicláveis<br>
            Este é um e-mail automático, não responda.
          </p>
        </div>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`E-mail enviado para: ${agendamento.email}`);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      // Não falha o agendamento se o e-mail não for enviado
    }
  }
}