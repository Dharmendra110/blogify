import jwt from 'jsonwebtoken'

const secret = "$uperMan@88";

export function createTokenForUser(user){
  const payload = {
    _id: user._id,
    fullName:user.fullName,
    email:user.email,
    profileImageURL:user.profileImageURL,
    role:user.role,
  }

  const token = jwt.sign(payload,process.env.JWT_SECRET);
  return token;
}

export function validateToken(token){
  const payload = jwt.verify(token,process.env.JWT_SECRET)
  return payload
}