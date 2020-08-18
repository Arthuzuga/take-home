import { formatMoney } from '../functions'

describe('Functions', () => {
  it('should format data as number to money', () => {
    expect(formatMoney('250000')).toEqual('2,500.00')
  })

  it('should format data as string to money', () => {
    expect(formatMoney('dbjfsbhjdf')).toEqual('0.00')
  })

  it('should format data as string and number to money', () => {
    expect(formatMoney('250000gdyudew')).toEqual('2,500.00')
  })
});
