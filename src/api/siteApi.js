import { blogPosts } from '../data/siteContent.js';

const APPOINTMENTS_STORAGE_KEY = 'nissi_appointments';
const appointmentEndpoint = import.meta.env.VITE_APPOINTMENT_ENDPOINT;

const wait = (ms = 240) => new Promise((resolve) => setTimeout(resolve, ms));

function readAppointments() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAppointments(appointments) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
}

export const siteApi = {
  async listBlogPosts() {
    await wait(180);
    return blogPosts;
  },

  async getBlogPost(postId) {
    await wait(120);
    return blogPosts.find((post) => post.id === postId) ?? null;
  },

  async submitAppointment(payload) {
    await wait(420);

    const appointment = {
      id: `appt_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      ...payload,
    };

    if (appointmentEndpoint) {
      const response = await fetch(appointmentEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });

      if (!response.ok) {
        throw new Error('Appointment submission failed.');
      }

      return appointment;
    }

    const appointments = readAppointments();
    appointments.unshift(appointment);
    writeAppointments(appointments);
    return appointment;
  },

  async listAppointments() {
    await wait(120);
    return readAppointments();
  },
};