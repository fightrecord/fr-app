export default {
  title: 'Fighter Data Submission',
  summary: 'Thank you for taking the time to submit your data, our community is built on the promotion of fighters like you. We have stringent data protection guidelines and we will keep your data safe. Please see our Privacy and GDPR policies for detailed information on how we do this. Both policies are linked from the bottom of this form.',
  sections: [
    {
      title: 'About you',
      summary: `Please tell us about you? We'll use this information to help promoters match fights among other things. For more detail on exactly how we use this data please see our Privacy Policy below.`,
      fields: [
        {
          label: 'Full name',
          type: 'singleLine',
          privacy: 'public',
          placeholder: 'Your full name',
          validation: () => [true]
        },
        {
          label: 'Date of Birth',
          type: 'date',
          privacy: 'private',
          validation: () => [true],
          explanation: `We'll use your date of birth to calculate your age which will be shown against your profile. We may even send you birthday card, but we will not share your date of birth publicly.`
        },
        {
          label: 'Gender',
          type: 'selection',
          options: { female: 'Female', male: 'Male' }
        },
        {
          label: 'Height',
          type: 'height'
        },
        {
          label: 'Weight',
          type: 'weight'
        },
      ]
    },
    {
      title: 'Classification',
      summary: `Please help us classify your profile by entering the requested data below.`,
      fields: [
        {
          label: 'Weight category',
          type: 'selection',
          firestoreOptions: 'classes'
        },
        {
          label: 'Active',
          type: 'selection',
          options: { active: 'Active', retired: 'Retired' },
          explanation: `Active means you have fought recently or are planning to fight again. This status can be changed if you change your mind at a later date.`
        },
        {
          label: 'Gym Name',
          type: 'singleLine',
          privacy: 'public',
          placeholder: 'The name of your primary Gym',
          validation: () => [true]
        },
        {
          label: 'Team Name',
          type: 'singleLine',
          privacy: 'public',
          placeholder: 'Team Name',
          validation: () => [true]
        },
        {
          label: 'Coach',
          type: 'singleLine',
          placeholder: 'Full Name of your Coach',
          validation: () => [true]
        }
      ]
    },
    {
      title: 'Contacting you',
      summary: `Your email address may be used by us, but we will not share it with third parties or other fighters or subscribers. We encourage the use of the Fight Record messaging system to conact fighters.`,
      fields: [
        {
          label: 'Email Address',
          type: 'singleLine',
          privacy: 'private',
          placeholder: 'Your Email address',
          validation: () => [true]
        },
        {
          label: 'Twitter',
          type: 'singleLine',
          privacy: 'public',
          placeholder: '@myusername',
          validation: () => [true]
        },
        {
          label: 'Facebook',
          type: 'singleLine',
          privacy: 'public',
          placeholder: 'Facebook username',
          validation: () => [true]
        },
        {
          label: 'Instagram',
          type: 'singleLine',
          privacy: 'public',
          placeholder: 'Instagram username',
          validation: () => [true]
        },
        {
          label: 'Snapchat',
          type: 'singleLine',
          privacy: 'public',
          placeholder: 'Snapchat username',
          validation: () => [true]
        },
        {
          label: 'TikTok',
          type: 'singleLine',
          privacy: 'public',
          placeholder: 'TikTok username',
          validation: () => [true]
        },
      ]
    }
  ]
};