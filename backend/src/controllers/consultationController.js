import { db } from '../services/db.js';

export const getBoutiques = (req, res) => {
  try {
    const boutiques = db.getBoutiques();
    res.json({ success: true, count: boutiques.length, data: boutiques });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getConsultations = (req, res) => {
  try {
    const { email } = req.query;
    const consultations = db.getConsultations(email);
    res.json({ success: true, count: consultations.length, data: consultations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createConsultation = (req, res) => {
  try {
    const { clientName, email, phone, boutiqueId, date, timeSlot, interest } = req.body;

    if (!clientName || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required to schedule a salon consultation.'
      });
    }

    const boutiques = db.getBoutiques();
    const selectedBoutique = boutiques.find((b) => b.id === boutiqueId) || boutiques[0];

    const appointment = db.createConsultation({
      clientName: clientName.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : '',
      boutiqueId: selectedBoutique.id,
      boutiqueName: selectedBoutique.name,
      boutiqueCity: selectedBoutique.city,
      date: date || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      timeSlot: timeSlot || '14:00 - 15:30',
      interest: interest || 'High Jewelry Viewing'
    });

    res.status(201).json({
      success: true,
      message: `Your private appointment at ${selectedBoutique.name} has been confirmed. A dedicated liaison will contact you shortly.`,
      data: appointment
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
