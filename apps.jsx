export const appointmentSchema = {
  name: 'Appointment',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    service_type: {
      type: 'string',
      enum: ['individual', 'couples', 'trauma', 'children-students'],
    },
    message: {
      type: 'string',
    },
    preferred_time: {
      type: 'string',
    },
    status: {
      type: 'string',
      enum: ['pending', 'confirmed', 'completed'],
      default: 'pending',
    },
  },
  required: ['name', 'email', 'service_type'],
};

export default appointmentSchema;