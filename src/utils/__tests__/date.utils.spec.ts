import { getDayOfWeek } from '../date.utils'

describe('Date Utils', () => {
  describe('getDayOfWeek', () => {
    it('should return the day of the week', () => {
      expect(getDayOfWeek(0)).toEqual('Sunday')
      expect(getDayOfWeek(1)).toEqual('Monday')
      expect(getDayOfWeek(2)).toEqual('Tuesday')
      expect(getDayOfWeek(3)).toEqual('Wednesday')
      expect(getDayOfWeek(4)).toEqual('Thursday')
      expect(getDayOfWeek(5)).toEqual('Friday')
      expect(getDayOfWeek(6)).toEqual('Saturday')
    })
  })
})
