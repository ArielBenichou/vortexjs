/** this is the master class that hold n length vectors
 *  it will have a length property,
 * and declare all the math functions for the vector that we need
 */
export class Vector {
    data: GLfloat[];
    length: number;

    constructor(...xs: GLfloat[]) {
        this.data = xs;
        this.length = xs.length;
    }

    toArray() {
        return this.data;
    }

    add(other: Vector) {
        return new Vector(...this.data.map((value, index) => value + other.data[index]));
    }

    sub(other: Vector) {
        return new Vector(...this.data.map((value, index) => value - other.data[index]));
    }
}

// ALl other Vec class are wrapper for the Vector class
export class Vec2 extends Vector {
  constructor(x: GLfloat, y: GLfloat) {
    super(x, y);
  }

  get x() {
    return this.data[0];
  }

  get y() {
    return this.data[1];
  } 
}

export class Vec3 extends Vector {
  constructor(x: GLfloat, y: GLfloat, z: GLfloat) {
    super(x, y, z);
  }

  get x() {
    return this.data[0];
  }

  get y() {
    return this.data[1];
  }

  get z() {
    return this.data[2];
  }
}


export class Vec4 extends Vector {
  constructor(x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat) {
    super(x, y, z, w);
  }

  get x() {
    return this.data[0];
  }

  get y() {
    return this.data[1];
  }

  get z() {
    return this.data[2];
  }

  get w() {
    return this.data[3];
  }
}
