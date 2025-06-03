export class DateUtils {
  // Format Date as YYYY-MM-DD
  static formatDate(date: Date | string): string {
    let d = date;
    
    if(typeof d === 'string') {
      d = new Date(date);
    }

    return d.toISOString().split('T')[0];
  }

  // Format Time as HH:mm:ss
  static formatTime(date: Date | string): string {
    let d = date;
    
    if(typeof d === 'string') {
      d = new Date(date);
    }

    return d.toTimeString().split(' ')[0];
  }

  // Format DateTime as YYYY-MM-DD HH:mm:ss
  static formatDateTime(date: Date | string): string {
    let d = date;
    
    if(typeof d === 'string') {
      d = new Date(date);
    }

    return `${this.formatDate(date)} ${this.formatTime(date)}`;
  }

  // Parse date from string (ISO format or custom format)
  static parseDate(str: string): Date | null {
    const date = new Date(str);
    return isNaN(date.getTime()) ? null : date;
  }

  // Get difference in days between two dates
  static dateDiffInDays(start: Date | string, end: Date | string): number {
    let startDate = start, endDate = end;
    
    if(typeof startDate === 'string') {
      startDate = new Date(startDate);
    }

    if(typeof endDate === 'string') {
      endDate = new Date(endDate);
    }


    const diff = endDate.getTime() - startDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  // Get difference in hours between two dates
  static dateDiffInHours(start: Date | string, end: Date | string): number {
    let startDate = start, endDate = end;
    
    if(typeof startDate === 'string') {
      startDate = new Date(startDate);
    }

    if(typeof endDate === 'string') {
      endDate = new Date(endDate);
    }

    const diff = endDate.getTime() - startDate.getTime();
    return diff / (1000 * 60 * 60);
  }

  // Get difference in minutes between two dates
  static dateDiffInMinutes(start: Date | string, end: Date | string): number {
    let startDate = start, endDate = end;
    
    if(typeof startDate === 'string') {
      startDate = new Date(startDate);
    }

    if(typeof endDate === 'string') {
      endDate = new Date(endDate);
    }

    const diff = endDate.getTime() - startDate.getTime();
    return diff / (1000 * 60);
  }

  // Add days to a date
  static addDays(date: Date | string, days: number): Date {    
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  // Add hours to a date
  static addHours(date: Date | string, hours: number): Date {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
  }

  // Check if two dates are the same day
  static isSameDay(date1: Date | string, date2: Date | string): boolean {
    let dateOne = date1, dateTwo = date2;
    
    if(typeof dateOne === 'string') {
      dateOne = new Date(dateOne);
    }

    if(typeof dateTwo === 'string') {
      dateTwo = new Date(dateTwo);
    }

    return (
      dateOne.getFullYear() === dateTwo.getFullYear() &&
      dateOne.getMonth() === dateTwo.getMonth() &&
      dateOne.getDate() === dateTwo.getDate()
    );
  }

  // Get current date in YYYY-MM-DD format
  static today(): string {
    return this.formatDate(new Date());
  }

  // Get time ago (e.g., "2 days ago")
  static timeAgo(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

    const intervals: [number, string][] = [
      [31536000, 'year'],
      [2592000, 'month'],
      [86400, 'day'],
      [3600, 'hour'],
      [60, 'minute'],
      [1, 'second'],
    ];

    for (const [secondsPerUnit, unit] of intervals) {
      const count = Math.floor(seconds / secondsPerUnit);
      if (count >= 1) {
        return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
      }
    }

    return 'just now';
  }

  // Check if a date is in the past
  static isPast(date: Date | string): boolean {
     const d = typeof date === 'string' ? new Date(date) : date;

    return d.getTime() < new Date().getTime();
  }

  // Check if a date is in the future
  static isFuture(date: Date | string): boolean {
    const d = typeof date === 'string' ? new Date(date) : date;

    return d.getTime() > new Date().getTime();
  }
}
