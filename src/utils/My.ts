class My {
  static displayJsonContents(jsonObj: object): void {
    const jsonString = JSON.stringify(jsonObj, null, 2); // The third argument (2) adds indentation for readability
    My.log(jsonString);
  }

  static getDefaultAltImgSrc(): string {
    return "/img/product/beetle-1.jpg";
  }

  static log(msg: string): void {
    console.log(msg);
  }

  static sleep(ms: number = 1000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static isEmptyString(str: string): boolean {
    return str.length === 0;
  }

  static generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }



  /**
   * 
   * @param min the minimum value
   * @param max the maximum value
   * @returns the random number between min and max (inclusive)
   */
  static getRandomNumber(min: number, max: number): number {
    // Math.random() generates a number between 0 (inclusive) and 1 (exclusive)
    // Multiply by (max - min + 1) to include the maximum value in the range
    // Math.floor() rounds down to the nearest integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  static generateRandomMoneyAmount(min: number, max: number): number {
    const randomAmount = Math.random() * (max - min) + min;
    const roundedAmount = Math.round(randomAmount * 100) / 100; // Round to 2 decimal places
    return roundedAmount;
  }


  static formatToMonetary(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

}


export default My;