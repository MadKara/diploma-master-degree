package com.karalash.ukrcontent.controller;

import com.karalash.ukrcontent.dto.CommentDto;
import com.karalash.ukrcontent.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("service-api/comments/")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    private final CommentService commentService;

    @GetMapping
    public List<CommentDto> getComments() {
        return commentService.getAll();
    }

    @GetMapping("/id/{id}")
    public CommentDto getComment(@PathVariable int id) {
        return commentService.getById(id);
    }

    @GetMapping("/user/{id}")
    public List<CommentDto> getCommentByUserId(@PathVariable int id) {
        return commentService.getByUserId(id);
    }

    @GetMapping("/content/{id}")
    public List<CommentDto> getCommentByContentId(@PathVariable int id) {
        return commentService.getByContentId(id);
    }

    @GetMapping("/message-containing/{message}")
    public List<CommentDto> getCommentsByMessageContaining(@PathVariable String message) {
        return commentService.getByMessageContaining(message);
    }

    @PostMapping
    public CommentDto addNewComment(@RequestParam String message, @RequestParam int userId, @RequestParam int contentId) {
        return commentService.addNew(message, userId, contentId);
    }

    @PutMapping
    public CommentDto updateComment(@RequestParam String message, @RequestParam int id) {
        return commentService.updateComment(new CommentDto(id, message));
    }

    @DeleteMapping("{id}")
    public void deleteComment(@PathVariable int id) {
        commentService.deleteComment(id);
    }
}
