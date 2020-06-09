const CronJob = require('cron').CronJob
const SerialPort = require('serialport')
const parser = new SerialPort.parsers.Readline({
    delimiter: ';'
})
let currentDevice = null


export const PortMixin = {
    data() {
        return {
            portPath: ""
        }
    },
    created() {
        const jobViewSerial = new CronJob('*/5 * * * * *', () => {
            this.lockDevice()
        })
        jobViewSerial.start()
    },
    methods: {
        dealDevice(data) {
            const tmp = {'time': Date.now().toString(), 'data': data.toString()}
            alert(JSON.stringify(tmp))
        },
        lockDevice() {
            if (currentDevice != null) {
                console.log('exist dev', currentDevice)
                if (currentDevice.isOpen === false) {
                    console.log('remove dev')
                    parser.removeListener('data', (data) => this.dealDevice(data))
                    currentDevice = null
                } else {
                    console.log('ready dev')
                    currentDevice.write('unit_test\n' + Date.now().toString() + ';', function (err) {
                        if (err) {
                            return console.log('Error on write: ', err.message)
                        }
                        console.log('write dev')
                    })
                }
            } else {
                let rel = SerialPort.list()
                rel.then(
                    data => {
                        this.openText = data
                        console.log('成功，串口列表为data:', data, this.portPath)
                        data.forEach(element => {
                            if (element['path'] === this.portPath) {
                                currentDevice = new SerialPort(element['comName'], () => {
                                    if (currentDevice.isOpen === true) {
                                        console.log("currentDevice_start", currentDevice)
                                        currentDevice.pipe(parser)
                                        console.log("currentDevice_end", currentDevice)
                                        parser.on('data', (data) => this.dealDevice(data))
                                    } else {
                                        currentDevice = null
                                    }
                                })
                                console.log('commit dev')
                                throw new Error('commit dev')
                            }
                        })
                    },
                    error => {
                        console.log('失败err:', error)
                    }
                )
            }

        }
    }
}
