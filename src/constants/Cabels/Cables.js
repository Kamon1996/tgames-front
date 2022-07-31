import actionCable from 'actioncable'

const CableApp = {}

CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')

export {CableApp}