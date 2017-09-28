import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';

class Calendar extends Component {
  constructor(props) {
    super(props);

    const mockEvents = {
      2017: {
        9: {
          1: [
            { title: 'Lunch plans', time: '08:00' },
            { title: 'Go shopping', time: '14:00' },
          ],
          8: [
            { title: 'Birthday party', time: '12:00' },
          ],
          13: [
            { title: 'Dinner w/ John', time: '15:30' },
          ],
          17: [
            { title: 'Family meeting', time: '18:00' },
          ],
          22: [
            { title: 'Doctors', time: '10:00' },
            { title: 'Cinema w/ family', time: '16:00' },
          ],
        },
        10: {
          4: [
            { title: 'Holiday!!', time: '12:00' },
          ],
        },
      },
    };

    // Above is mock data.

    this.state = {
      mockEvents,
      selectedDate: moment(),
      selectedYear: moment().year(),
    };
  }

  render() {
    const { selectedDate, selectedYear } = this.state;
    const currentDate = moment(selectedDate).year(selectedYear);

    return (
      <div
        className='container'>
        <div
          className='calendar-wrapper'>
          <div
            className='date-selector'>
            <ul>
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({
                      selectedYear: (this.state.selectedYear - 1),
                    });
                  }}
                  href='#previousYear'>{currentDate.clone().subtract(1, 'year').format('YYYY')}</a>
              </li>
              {(_.times(12, (i) => {
                return (
                  <li
                    className={currentDate.month() === i ? 'active' : ''}
                    key={i}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          selectedDate: currentDate.clone().month(i),
                        });
                      }}
                      href='#updateMonth'>{moment().month(i).format('MMM')}</a>
                  </li>
                );
              }))}
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({
                      selectedYear: (this.state.selectedYear + 1),
                    });
                  }}
                  href='#nextYear'>{currentDate.clone().add(1, 'year').format('YYYY')}</a>
              </li>
            </ul>
          </div>
          <div
            className='calendar-body'>
            <ul>
              {(_.times((currentDate.startOf('month').isoWeekday() - 1), (i) => {
                return (
                  <li
                    className='placeholder'
                    key={`placeholder-start-${i}`}
                  />
                );
              }))}

              {(_.times(currentDate.daysInMonth(), (i) => {
                i += 1;

                const yearEvents = this.state.mockEvents[(currentDate.year())] || [];
                const monthEvents = yearEvents[(currentDate.month() + 1)] || [];
                const currentEvents = monthEvents[i] || [];
                const initialEvent = currentEvents[0];

                return (
                  <li
                    key={`day-${i}`}>
                    <div
                      className='day-header'>
                      <div
                        className={`date ${((currentDate.year() === moment().year()) && (currentDate.month() === moment().month()) && (moment().date() === i)) ? 'today' : ''}`}>{i}</div>
                      <div
                        className='day'>{currentDate.date(i).format('ddd')}</div>
                    </div>
                    {(initialEvent &&
                      <span
                        className='day-content'>
                        <div
                          className='event'>
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            href='#handleEvent'><p>{`${initialEvent.title} - ${initialEvent.time}`}</p></a>
                        </div>
                        {(currentEvents.length > 1) && (
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            href='#showMore'>
                            <small>{`+${currentEvents.length - 1} more`}</small>
                          </a>
                        )}
                      </span>
                    )}
                  </li>
                );
              }))}

              {(_.times((7 - currentDate.endOf('month').isoWeekday()), (i) => {
                return (
                  <li
                    className='placeholder'
                    key={`placeholder-end-${i}`}
                  />
                );
              }))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
