package com.cinamatheque.cinamatheque.listeners;


import com.cinamatheque.cinamatheque.model.Comment;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class CommentEventListener extends AbstractMongoEventListener<Comment> {

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Comment> event){
        super.onBeforeConvert(event);

        Date datenow = new Date();

        event.getSource().setCreated_at(datenow);
    }
}
