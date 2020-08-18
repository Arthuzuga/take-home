import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, ReactWrapper, shallow } from 'enzyme';
import App from '../../App';

const inputInitialValue = "250000";
const initialMonth = "September2020";
const nextMonth = "October2020";
const nextSummaryMonth = "October 2020";
const initialSummaryMonth = "September 2020";

describe('Components', () => {
  let component: ReactWrapper;
  beforeEach(() => {
    component = mount(<App />)
  })

  afterEach(() => {
    component.unmount()
  })
  
  it('should render input', () => {
    expect(component.find('input[data-testid="amountValue"]')).toHaveLength(1)
  })

  it('should render DatePicker Component', () => {
    expect(component.find('[data-testid="datePicker"]')).toHaveLength(1)
  });

  it('should render Arrow Left Button', () => {
    expect(component.find('div[data-testid="arrowLeft"]')).toHaveLength(1)
  });

  it('should render Arrow Right Button', () => {
    expect(component.find('div[data-testid="arrowRight"]')).toHaveLength(1)
  });

  it('should render Montly Amount Span', () => {
    expect(component.find('span[data-testid="montlyAmountText"]')).toHaveLength(1)
  });

  it('should render Summary Div', () => {
    expect(component.find('div[data-testid="summary"]')).toHaveLength(1)
  });
  
  it('should render Montly Amount initial value', () => {
    expect(component.find('span[data-testid="montlyAmountText"]').text()).toEqual("$0.00")
  });
  
  it('should render Sumary Initial Text', () => {
    expect(component.find('div[data-testid="summary"]').text()).toEqual(`You're planning 1 monthly deposits to reach your $ 0.00 goal by ${initialSummaryMonth}`)
  });

  it('should change Input Value', () => {
    component.find('input[data-testid="amountValue"]').simulate('change', {
      target: {
        value: inputInitialValue
      }
    })
    expect(component.find('input[data-testid="amountValue"]').prop('value')).toEqual("2,500.00")
  })

  it('should change DatePicker by Keydown right', () => { 
    const map:any = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const component = mount(<App />);
    act(() => map.keydown({ keyCode: 39 }))
    expect(component.find('[data-testid="datePicker"]').text()).toEqual(nextMonth)
    component.unmount()
  })
  
  it('should change DatePicker by Keydown left', () => { 
    const map:any = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const component = mount(<App />);
    act(() => map.keydown({ keyCode: 37 }))
    expect(component.find('[data-testid="datePicker"]').text()).toEqual(initialMonth)
    component.unmount()
   })
  it('should not change DatePicker by Keydown any other key', () => { 
    const map:any = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const component = mount(<App />);
    act(() => { map.keydown({ keyCode: 42 }) })
    expect(component.find('[data-testid="datePicker"]').text()).toEqual(initialMonth)
    component.unmount()
   })

  it('should change DatePicker Value to Next Month by Arrow click', () => {
    component.find('div[data-testid="arrowRight"]').simulate('click')
    expect(component.find('[data-testid="datePicker"]').text()).toEqual(nextMonth)
  })

  it('should change DatePicker Value to Previous Month by Arrow click', () => {
    component.find('div[data-testid="arrowLeft"]').simulate('click')
    expect(component.find('[data-testid="datePicker"]').text()).toEqual(initialMonth)
  })

  it('should change DatePicker by onChange 1', () => {
    const newDate = new Date((new Date()).setMonth(8))
    component.find('a').prop('onChange').call(newDate)
    
    expect(component.find('a[data-testid="datePicker"]').text()).toEqual(initialMonth)
  })

  it('should change DatePicker by onChange 2', () => {
    const mockFn = jest.fn()
    const newDate = new Date((new Date()).setMonth(9))
    act(()=>{ component.find('a').prop('onChange').call(mockFn,newDate)})
    expect(component.find('a[data-testid="datePicker"]').text()).toEqual(nextMonth)
  })


  it('should change Monthly Amount Value for Next Month', () => {
    component.find('div[data-testid="arrowRight"]').simulate('click')
    component.find('input[data-testid="amountValue"]').simulate('change', {
      target: {
        value: inputInitialValue
      }
    })
    expect(component.find('span[data-testid="montlyAmountText"]').text()).toEqual("$1,250.00")
  })

  it('should change Monthly Amount Value for Previous', () => {
    component.find('div[data-testid="arrowLeft"]').simulate('click')
    component.find('input[data-testid="amountValue"]').simulate('change', {
      target: {
        value: inputInitialValue
      }
    })
    expect(component.find('span[data-testid="montlyAmountText"]').text()).toEqual("$2,500.00")
  })

  it('should change Summary Info for the Next Month', () => {
    component.find('div[data-testid="arrowRight"]').simulate('click')
    component.find('input[data-testid="amountValue"]').simulate('change', {
      target: {
        value: inputInitialValue
      }
    })
    expect(component.find('div[data-testid="summary"]').text()).toEqual(`You're planning 2 monthly deposits to reach your $ 2,500.00 goal by ${nextSummaryMonth}`)
  })
});
