package com.example.demo.user;

public class UsernameTakenException extends Exception{
    public UsernameTakenException(String info){
        super(info);
    }
}
