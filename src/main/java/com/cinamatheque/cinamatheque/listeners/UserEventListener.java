package com.cinamatheque.cinamatheque.listeners;

import com.cinamatheque.cinamatheque.model.User;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class UserEventListener extends AbstractMongoEventListener<User> {
    @Override
    public void onBeforeConvert(BeforeConvertEvent<User> event){
        super.onBeforeConvert(event);

        Date datenow = new Date();

        event.getSource().setCreated_at(datenow);
    }
}
