import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "./user.model";
import { LoginDto, RegisterDto } from "./auth.types";

export class AuthService {

  // REGISTRO
  async register(data: RegisterDto) {
    const usuarioExistente = await UserModel.findOne({
      correo: data.correo
    });

    if (usuarioExistente) {
      throw new Error("El correo ya está registrado");
    }

    // Encriptar contraseña
    const passwordHash = await bcrypt.hash(data.password, 10);

    const usuario = await UserModel.create({
      nombre: data.nombre,
      correo: data.correo,
      password: passwordHash,
      rol: "usuario"
    });

    return {
      id: usuario._id.toString(),
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    };
  }

  // LOGIN
  async login(data: LoginDto) {
    const usuario = await UserModel.findOne({
      correo: data.correo
    });

    if (!usuario) {
      throw new Error("Correo o contraseña incorrectos");
    }

    // Comparar contraseña ingresada con la contraseña encriptada
    const passwordValida = await bcrypt.compare(
      data.password,
      usuario.password
    );

    if (!passwordValida) {
      throw new Error("Correo o contraseña incorrectos");
    }

    const accessToken = jwt.sign(
      {
        id: usuario._id.toString(),
        correo: usuario.correo,
        rol: usuario.rol
      },
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: 900
      }
    );

    const refreshToken = jwt.sign(
      {
        id: usuario._id.toString()
      },
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: 604800
      }
    );

    return {
      accessToken,
      refreshToken,
      usuario: {
        id: usuario._id.toString(),
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    };
  }

  // REFRESH TOKEN
  refreshToken(token: string) {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string
    ) as {
      id: string;
    };

    const accessToken = jwt.sign(
      {
        id: decoded.id
      },
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: 900
      }
    );

    return accessToken;
  }
}