const areas =  [
    { label: '20-25', power: 5, base: 11000, pipeLayingOrInstallation: 6500, indoorUnit: 3000, dismantling: 6500 },
    { label: '30-35', power: 6, base: 12000, pipeLayingOrInstallation: 7000, indoorUnit: 3300, dismantling: 7000},
    { label: '40-55', power: 8, base: 13000, pipeLayingOrInstallation: 7500, indoorUnit: 3550, dismantling: 7500},
    { label: '60-70', power: 9, base: 14000, pipeLayingOrInstallation: 8000, indoorUnit: 3800, dismantling: 8000 },
    { label: '75-85', power: 11, base: 14500, pipeLayingOrInstallation: 8250, indoorUnit: 3900, dismantling: 8250 },
    { label: '90-100', power: 11, base: 15000, pipeLayingOrInstallation: 8500, indoorUnit: 4100, dismantling: 8500 }
]

const conditioners = [
    { label: 'S1', power: 5, price: 24000 },
    { label: 'S2', power: 5, price: 28000 },
    { label: 'M1', power: 7, price: 29000 },
    { label: 'M2', power: 8, price: 32000 },
    { label: 'M3', power: 8, price: 34000 },
    { label: 'M4', power: 9, price: 36000 },
    { label: 'L1', power: 11, price: 40000 },
    { label: 'L2', power: 11, price: 44000 },
    { label: 'L3', power: 12, price: 55000 }
]

export { areas, conditioners }