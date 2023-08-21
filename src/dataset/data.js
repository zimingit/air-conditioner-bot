const AREAS =  [
    { label: '20-25', type: 'xs', base: 11000, pipeLayingOrInstallation: 6500, indoorUnit: 3000, dismantling: 6500 },
    { label: '30-35', type: 's',  base: 12000, pipeLayingOrInstallation: 7000, indoorUnit: 3300, dismantling: 7000},
    { label: '40-55', type: 'm',  base: 13000, pipeLayingOrInstallation: 7500, indoorUnit: 3550, dismantling: 7500},
    { label: '60-70', type: 'l',  base: 14000, pipeLayingOrInstallation: 8000, indoorUnit: 3800, dismantling: 8000 },
    { label: '75-85', type: 'xl',  base: 14500, pipeLayingOrInstallation: 8250, indoorUnit: 3900, dismantling: 8250 },
    { label: '90-100', type: 'xxl',  base: 15000, pipeLayingOrInstallation: 8500, indoorUnit: 4100, dismantling: 8500 }
]

const TYPES = {
    xs: { minArea: 20, maxArea: 25, btu: ['07', '09'], label: 'xs' },
    s: { minArea: 30, maxArea: 35, btu: ['12'], label: 's' },
    m: { minArea: 40, maxArea: 55, btu: ['18'], label: 'm' },
    l: { minArea: 60, maxArea: 70, btu: ['24'], label: 'l' },
    xl: { minArea: 75, maxArea: 85, btu: ['30'], label: 'xl' },
    xxl: { minArea: 90, maxArea: 100, btu: ['36'], label: 'xxl' }
}

// Модели нужно как-то понятно называть (помимо названия производителя), чтобы принадлежность к типу была
const CONDITIONERS = [
    { model: 'B07TS', manufacturer: 'LG', power: 2.1, price: 51629, type: 'xs' },
    { model: 'B09TS', manufacturer: 'LG', power: 2.7, price: 55400, type: 'xs' },
    { model: 'EACS-12HAT', manufacturer: 'Electrolux', power: 3.4, price: 40222, type: 's' },
    { model: 'AS-12HR4SVDDJ3G', manufacturer: 'Hisense', power: 3.2, price: 30400, type: 's' },
    { model: 'B18TS', manufacturer: 'LG', power: 5.3, price: 79900, type: 'm' },
    { model: 'Arctic Nano RS-G18A', manufacturer: 'Roda', power: 5.2, price: 36900, type: 'm' },
    { model: 'Arctic Nano Inverter RS-GL18A', manufacturer: 'Roda', power: 5, price: 42075, type: 'm' },
    { model: 'TA53FFUL-1832IA', manufacturer: 'TESLA', power: 5.4, price: 42750, type: 'm' },
    { model: 'Arctic Nano RS-G24A', manufacturer: 'Roda', power: 7, price: 50890, type: 'l' },
    { model: 'HEC-24HTC03', manufacturer: 'HEC', power: 6.5, price: 48000, type: 'l' },
    { model: 'DMI-24', manufacturer: 'DAHATSU', power: 7, price: 56900, type: 'l' },
    { model: 'SSH-P309BE', manufacturer: 'Shivaki', power: 8.8, price: 75910, type: 'xl' },
    { model: 'GRI/GRO-30HH2', manufacturer: 'GREEN', power: 8.5, price: 79049, type: 'xl' },
    { model: 'Nordic EACS-36HT', manufacturer: 'Electrolux', power: 9.5, price: 115990, type: 'xxl' },
    { model: 'DA-36H', manufacturer: 'Dahatsu', power: 10, price: 109000, type: 'xxl' }
]

const CONDITIONERSEXTENDED = CONDITIONERS.map(conditioer => {
    const area = AREAS.find(({ type }) => conditioer.type === type)
    return { ...conditioer, area }
})

export { AREAS, CONDITIONERS, CONDITIONERSEXTENDED, TYPES }