const fullRotate = () => {
  const rotate = {}
  for (let i = -180; i <= 360; i++) {
    rotate[i] = `${i}deg`
  }
  return rotate
}

module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@moosty/dao-storybook/**/*.{js,jsx,ts,tsx}',
    './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      '32px': '32px',
      '28px': '28px',
      '24px': '24px',
      '20px': '20px',
      '18px': '18px',
      '16px': '16px',
      '15px': '15px',
      '13px': '13px',
    },
    boxShadow: {
      defaultPrimary: 'var(--shadow-defaultPrimary)',
      cardYes: 'var(--shadow-defaultSecondary)',
      cardNo:'var(--shadow-defaultTertiary)',

    },

    extend: {
      lineHeight: {
        '46px': '46px',
        '41px': '41px',
        '36px': '36px',
        '30px': '30px',
        '28px': '28px',
        '24px': '24px',
        '22px': '22px',
        '20px': '20px',
        '18px': '18px',
        '16px': '16px',
      },
      fontFamily: {
        'heading': 'var(--font-familyHeadings)',
        'button': 'var(--font-familyButtons)',
        'body': 'var(--font-familyBody)',
        'caption': 'var(--font-familyCaption)',
      },
      spacing: {
        '12px': '12px',
        '9px': '9px',
        '16px': '16px',
        '24px': '24px',
        '32px': '32px',
        '6px': '6px',
      },
      borderRadius: {
        'default': 'var(--border-radius-default)',
      },
      borderWidth: {
        '3': '3px',
      },
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
        'app': '85%',
        'card' : '366px',
      },
      inset: {
        '1px': '1px',
        '2px': '2px',
        '3px': '3px',
        '4px': '4px',
        '5px': '5px',
        '6px': '6px',
        '7px': '7px',
        '8px': '8px',
        '9px': '9px',
        '10px': '10px',
        '11px': '11px',
        '12px': '12px',
        '13px': '13px',
        '14px': '14px',
        '15px': '15px',
      },
      rotate: {
        ...fullRotate(),
      },
      colors: {
        textHeadings: 'var(--color-text-headings)',
        textBody: 'var(--color-text-body)',
        textCaption: 'var(--color-text-caption)',
        textDisabled: 'var(--color-text-disabled)',
        textPlaceHolder: 'var(--color-text-placeHolder)',
        textLink: 'var(--color-text-link)',
        textHover: 'var(--color-text-hover)',
        textError: 'var(--color-text-error)',

        cardBg: 'var(--color-deep-0)',

        surfaceBg: 'var(--color-surface-bg)',
        surfaceIconBg: 'var(--color-surface-icon-bg)',
        surfaceOutline: 'var(--color-surface-outline)',

        themeNavBarBg: 'black',
        themeButtonBg: 'var(--color-theme-button-bg)',
        themeButtonBgSecondary: 'var(--color-theme-button-bg-secondary)',
        themeButtonTextPrimary: 'var(--color-deep-0)',
        themeHover: 'var(--color-theme-hover)',
        themePressed: 'var(--color-theme-pressed)',
        themeDark: 'var(--color-theme-dark)',
        themeLight: 'var(--color-theme-light)',

        formBorder: 'var(--color-forms-border)',
        formHoverBorder: 'var(--color-forms-hover-border)',
        formReadOnly: 'var(--color-forms-read-only)',
        formDisabled: 'var(--color-forms-disabled)',
        formActive: 'var(--color-forms-active)',
        formError: 'var(--color-forms-error)',
        formDivider: 'var(--color-forms-divider)',

        dangerBackground: 'var(--color-danger-background)',
        dangerLight: 'var(--color-danger-light)',
        dangerOutline: 'var(--color-danger-outline)',
        dangerIcon: 'var(--color-danger-icon)',
        dangerDark: 'var(--color-danger-dark)',

        successBackground: 'var(--color-success-background)',
        successLight: 'var(--color-success-light)',
        successOutline: 'var(--color-success-outline)',
        successIcon: 'var(--color-success-icon)',
        successDark: 'var(--color-success-dark)',

        infoBackground: 'var(--color-info-background)',
        infoLight: 'var(--color-info-light)',
        infoOutline: 'var(--color-info-outline)',
        infoIcon: 'var(--color-info-icon)',
        infoDark: 'var(--color-info-dark)',

        warningBackground: 'var(--color-warning-background)',
        warningLight: 'var(--color-warning-light)',
        warningOutline: 'var(--color-warning-outline)',
        warningIcon: 'var(--color-warning-icon)',
        warningDark: 'var(--color-warning-dark)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],


}
