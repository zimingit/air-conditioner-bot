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
    { model: 'DA-36H', manufacturer: 'Dahatsu', power: 11, price: 109000, type: 'xxl' }
]

const CONDITIONERSEXTENDED = CONDITIONERS.map(conditioer => {
    const area = AREAS.find(({ type }) => conditioer.type === type)
    return { ...conditioer, area }
})

// Доп.услуги
const freonRouteExtension = [
    { name: 's', label: 'До 5 кВт', minPower: 0, maxPower: 5, price: 1000 },
    { name: 'm', label: 'До 10 кВт', minPower: 5, maxPower: 10, price: 1500 },
    { name: 'l', label: 'Свыше 10 кВт', minPower: 10, maxPower: 1000, price: 2000 },
]
const cableСhannel = [
    { name: 'simple', label: 'ПВХ', price: 600 },
    { name: 'arctic', label: 'Арктика', price: 1000 }
]
const freon = [
    { name: 'r4', label: 'R 410А', price: 220 },
    { name: 'r2', label: 'R22,32', price: 320 }
]
const ADDITIONALSERVICESWIDGETS = {
    freonRouteExtension: { name: 'number', params: { step: 1 }, unit: 'м' },
    electricalCable: { name: 'number', params: { step: 1 }, unit: 'м' },
    electricCableChannel: { name: 'number', params: { step: 1 }, unit: 'м' },
    freonCableChannel: { name: 'number', params: { step: 1 }, unit: 'м' },
    drainage: { name: 'number', params: { step: 1 }, unit: 'м' },
    freonRefueling: { name: 'switcher', params: {}, unit: '' },
    freon: { name: 'number', params: { step: 100 }, unit: 'гр' }
}
const configEdit = {
    useOnEdit: true,
    useAutoOptionSelect: false
}
const ADDITIONALSERVICES = [
    { name: 'freonRouteExtension',      label: 'Удлинение трассы фреон',  description: '',                                    price: null,        prices: freonRouteExtension, configEdit: { useOnEdit: true, useAutoOptionSelect: true }},
    { name: 'electricalCable',          label: 'Электрический кабель',    description: '',                                    price: 170,         prices: [], configEdit },
    { name: 'electricCableChannel',     label: 'Кабель-канал',            description: 'Под электрический кабель',            price: 170,         prices: [], configEdit },
    { name: 'drainage',                 label: 'Дренаж ',                 description: '',                                    price: 170,         prices: [], configEdit },       
    { name: 'freonCableChannel',        label: 'Кабель-канал',            description: 'Под трассу фреон',                    price: null,        prices: cableСhannel, configEdit },
    { name: 'freonRefueling',           label: 'Дозаправка фреоном',      description: 'При длине трассы более 7 метров',     price: 1500,        prices: [], configEdit: { useOnEdit: false } },
    { name: 'freon',                    label: 'Фреон',                   description: 'При дозаправке считаем по 100 грамм', price: null,        prices: freon, configEdit }
]

const ADDITIONALSERVICESEXTENDED = ADDITIONALSERVICES.map(service => {
    const key = service.name
    const widget = ADDITIONALSERVICESWIDGETS[key]
    return { ...service, widget }
})

// Штробление стен
const pricesByMaterialType = {
    brick: 720,
    beton: 960,
    insulation: 300,
    gasBlock: 720,
    wood: 720
}
const freonRouteChaisingPriceByCableType = [
    { name: 'simple', label: 'ПВХ', price: pricesByMaterialType },
    { name: 'arctic', label: 'Арктика', price: { brick: 1000, beton: 1500, insulation: 400, gasBlock: 1000, wood: 1000 } }
]
const WALLMATERIALS = [
    { name: 'brick',        label: 'Кирпич' },
    { name: 'beton',        label: 'Бетон' },
    { name: 'insulation',   label: 'Утеплитель' },
    { name: 'gasBlock',     label: 'Газоблок' },
    { name: 'wood',         label: 'Дерево' }
]
const WALLCHASINGS = [
    { name: 'freonRoute',     label: 'Под фреон',    description: '', prices: freonRouteChaisingPriceByCableType },
    { name: 'drainageRoute',  label: 'Под дренаж',   description: '', price: pricesByMaterialType },
    { name: 'cableRoute',     label: 'Под кабель',   description: '', price: pricesByMaterialType }
]

// Дополнительный проход стен
const WALLTYPES = [
    { name: 'small', label: 'До 7 см'},
    { name: 'large', label: 'От 7 см'},
]
const holeFreonPricesByWallType = {
    small: {
        brick: 400,
        beton: 600,
        gasBlock: 400,
        wood: 400
    },
    large: {
        brick: 500,
        beton: 1000,
        gasBlock: 500,
        wood: 500
    }
}
const holeDrainageAndCableRoutePricesByWallType = {
    small: {
        brick: 300,
        beton: 300,
        gasBlock: 300,
        wood: 300
    },
    large: {
        brick: 350,
        beton: 350,
        gasBlock: 350,
        wood: 350
    }
}
const DIAMONDDRILLINGBYMATERIAL = {
    brick: 2000,
    beton: 4000,
    gasBlock: 2000,
    wood: 2000
}

const WALLHOLEMATERIALS = [
    { name: 'brick',        label: 'Кирпич' },
    { name: 'beton',        label: 'Бетон' },
    { name: 'gasBlock',     label: 'Газоблок' },
    { name: 'wood',         label: 'Дерево' }
]
const HOLETYPES = [
    { name: 'freonRoute',     label: 'Под фреон',    description: '', prices: holeFreonPricesByWallType },
    { name: 'drainageRoute',  label: 'Под дренаж',   description: '', prices: holeDrainageAndCableRoutePricesByWallType },
    { name: 'cableRoute',     label: 'Под кабель',   description: '', prices: holeDrainageAndCableRoutePricesByWallType }
]


export {
    AREAS,
    CONDITIONERS,
    CONDITIONERSEXTENDED,
    TYPES,
    ADDITIONALSERVICES,
    ADDITIONALSERVICESEXTENDED,
    WALLMATERIALS,
    WALLCHASINGS,
    HOLETYPES,
    WALLHOLEMATERIALS,
    WALLTYPES,
    DIAMONDDRILLINGBYMATERIAL
}